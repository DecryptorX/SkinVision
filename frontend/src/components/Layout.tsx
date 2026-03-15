import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30 text-foreground w-full">
      <Navbar />
      <main className="flex-1 w-full flex flex-col pt-16 mt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
