"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Phone,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Clinic {
  id: string;
  name: string;
  distance: number;
  address: string;
  lat: number;
  lon: number;
  phone?: string;
}

interface LocationMapProps {
  className?: string;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function LocationMap({ className }: LocationMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [city, setCity] = useState<string>("");
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState(false);

  const fetchClinics = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const query = `[out:json][timeout:30];
(
  node["healthcare"="dermatologist"](around:5000,${latitude},${longitude});
  node["amenity"="clinic"]["healthcare"="dermatology"](around:5000,${latitude},${longitude});
  node["amenity"="clinic"]["name"~"derma|skin",i](around:5000,${latitude},${longitude});
  node["amenity"="hospital"]["name"~"derma|skin",i](around:5000,${latitude},${longitude});
  node["amenity"="doctors"]["healthcare"="dermatology"](around:5000,${latitude},${longitude});
);
out body;`;

        const res = await fetch(`https://overpass-api.de/api/interpreter`, {
          method: "POST",
          body: query,
        });

        if (!res.ok) return;
        const data = await res.json();

        const found: Clinic[] = data.elements
          .filter((el: any) => el.lat && el.lon && el.tags?.name)
          .map((el: any) => ({
            id: String(el.id),
            name: el.tags.name,
            distance: haversineDistance(latitude, longitude, el.lat, el.lon),
            address:
              [
                el.tags["addr:housenumber"],
                el.tags["addr:street"],
                el.tags["addr:city"],
              ]
                .filter(Boolean)
                .join(", ") || "Address not available",
            lat: el.lat,
            lon: el.lon,
            phone: el.tags?.phone || el.tags?.["contact:phone"],
          }))
          .sort((a: Clinic, b: Clinic) => a.distance - b.distance)
          .slice(0, 8);

        setClinics(found);
      } catch {
        // silently fail — empty state handles it
      }
    },
    []
  );

  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        const cityName =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.county ||
          "Your Location";
        setCity(cityName);
      } catch {
        setCity("Your Location");
      }
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || !navigator?.geolocation) {
      setGeoError(true);
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLon(longitude);
        await Promise.all([
          reverseGeocode(latitude, longitude),
          fetchClinics(latitude, longitude),
        ]);
        setLoading(false);
      },
      () => {
        setGeoError(true);
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, [fetchClinics, reverseGeocode]);

  const mapUrl =
    lat && lon
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lon}`
      : null;

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <MapPin className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            Dermatologists Near You
          </h2>
          <p className="text-sm text-white/50">
            {loading
              ? "Detecting your location..."
              : geoError
                ? "Location access required"
                : `Showing results near ${city}`}
          </p>
        </div>
      </div>

      {/* Map Container */}
      <motion.div
        layout
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 cursor-pointer"
        animate={{ height: isExpanded ? 420 : 160 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => !loading && !geoError && setIsExpanded(!isExpanded)}
      >
        {/* Gradient overlay when collapsed */}
        <AnimatePresence>
          {!isExpanded && !loading && !geoError && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/80 flex items-end justify-center pb-4 pointer-events-none"
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>Click to expand map</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              <span className="text-sm text-white/60">
                Detecting location...
              </span>
            </div>
          </div>
        )}

        {/* Geo Error */}
        {geoError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <AlertCircle className="w-8 h-8 text-amber-400" />
              <p className="text-sm text-white/70 max-w-xs">
                Location access was denied. Please enable location permissions
                in your browser to find nearby dermatologists.
              </p>
            </div>
          </div>
        )}

        {/* Map iframe or CSS animated placeholder */}
        {!geoError &&
          (mapUrl ? (
            <iframe
              src={mapUrl}
              className="w-full h-full border-0"
              title="Nearby Dermatologists Map"
              loading="lazy"
            />
          ) : (
            // Animated CSS placeholder grid
            <div className="w-full h-full relative overflow-hidden bg-[#070714]">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(52,211,153,0.08)_0%,_transparent_70%)] pointer-events-none" />
            </div>
          ))}

        {/* Location pill */}
        {!loading && !geoError && lat && lon && (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 pointer-events-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-white/80 font-medium">
              {city || "Your Location"}
            </span>
          </div>
        )}

        {/* Collapse button */}
        {isExpanded && (
          <button
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white hover:bg-black/90 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      {/* Clinic List */}
      {!loading && !geoError && (
        <>
          {clinics.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 rounded-2xl border border-dashed border-white/10 text-center">
              <MapPin className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-white/50 text-sm font-medium">
                No dermatology clinics found nearby.
              </p>
              <p className="text-white/30 text-xs mt-1">
                Try expanding the search radius or searching manually on Google
                Maps.
              </p>
              <a
                href={`https://www.google.com/maps/search/dermatologist+near+me`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" /> Search on Google Maps
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clinics.map((clinic, i) => (
                <motion.div
                  key={clinic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="relative p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden"
                >
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
                        {clinic.name}
                      </h3>
                      <p className="text-xs text-white/40 mt-1 line-clamp-1">
                        {clinic.address}
                      </p>
                    </div>
                    <div className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                      {clinic.distance < 1
                        ? `${Math.round(clinic.distance * 1000)}m`
                        : `${clinic.distance.toFixed(1)}km`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Directions
                    </a>
                    {clinic.phone ? (
                      <a
                        href={`tel:${clinic.phone}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                    ) : (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.name)}&near=${clinic.lat},${clinic.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-medium hover:bg-white/10 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" /> View Map
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
