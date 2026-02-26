"use client";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-[#171717] hover:bg-[#2A2B32] text-gray-300">
      <div className="p-3">
        <button className="w-full text-sm px-3 py-2 rounded-md border border-[#4D4D4F] hover:bg-gray-700 transition">
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1 text-sm">
        <div className="px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer">
          No conversations yet
        </div>
      </div>

      <div className="p-3 text-xs text-gray-500">AI Contact Center</div>
    </aside>
  );
}
