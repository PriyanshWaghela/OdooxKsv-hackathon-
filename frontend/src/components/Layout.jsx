import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function Layout({ children }) {
  return (
    <div className="flex bg-background text-on-background min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[288px] min-h-screen flex flex-col relative bg-background">
        <TopBar />
        <main className="flex-1 px-xl pb-xl flex flex-col max-w-container-max relative z-10 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
