/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  Film, 
  BarChart3, 
  LayoutDashboard,
  LogOut,
  DollarSign,
  Home,
  Clapperboard,
  Settings,
  UserStar,
  Users,
  Tag,
  ChevronDown
} from 'lucide-react';

const AdminSidebar = ({ user }: any) => {
  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      label: "Media Library",
      href: "/admin/media",
      icon: Film,
      children: [
        { label: "Create Media", href: "/admin/media/create" },
        { label: "All Media", href: "/admin/media" },
      ],
    },
    {
      label: "Genres",
      href: "/admin/genres",
      icon: Tag,
      children: [
        { label: "Create Genre", href: "/admin/genres/create" },
        { label: "All Genres", href: "/admin/genres" },
      ],
    },
    { label: "Reviews", href: "/admin/reviews", icon: UserStar },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Payments", href: "/admin/payments", icon: DollarSign },
    { type: "divider" },
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Clapperboard },
    { label: "Profile", href: "/profile/settings", icon: Settings },
  ];

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-slate-900 border-r border-slate-800">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Film className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">StreamAdmin</span>
      </div>

      {/* Navigation */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="space-y-2">
          {navItems.map((item, idx) => {
       
            if (item.type === "divider") {
              return <div key={idx} className="my-4 border-t border-slate-800" />;
            }

            const Icon = item.icon; 

            return (
              <div key={item.label}>
                {/* Main Link */}
                <a
                  href={item.href}
                  className="flex items-center px-3 py-2 text-slate-300 transition-colors duration-300 transform rounded-lg hover:bg-slate-800 hover:text-white group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">
                    {Icon && <Icon size={20} />}
                  </span>
                  <span className="mx-3 font-medium flex-1">{item.label}</span>
                  {item.children && <ChevronDown size={14} className="text-slate-500" />}
                </a>

         
                {item.children && (
                  <div className="ml-9 mt-1 space-y-1 border-l border-slate-800">
                    {item.children.map((child: any) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="mt-10">
          <div className="flex items-center gap-x-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@platform.com'}</p>
            </div>
          </div>
          
          <button className="flex items-center w-full px-3 py-2 mt-4 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all group">
            <LogOut size={18} />
            <span className="mx-3 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;