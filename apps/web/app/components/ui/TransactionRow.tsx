import React from "react";

interface TransactionRowProps {
  iconName: string;
  iconBgColors: string;
  iconTextColor: string;
  title: string;
  subtitle: string;
  amount: string;
  networkName: string;
  networkColor: string;
  status: string;
  statusColors: string;
  hash: string;
  date: string;
}

export function TransactionRow({
  iconName,
  iconBgColors,
  iconTextColor,
  title,
  subtitle,
  amount,
  networkName,
  networkColor,
  status,
  statusColors,
  hash,
  date,
}: TransactionRowProps) {
  return (
    <tr className="hover:bg-white/5 transition-all group">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${iconBgColors}`}
          >
            <span className={`material-symbols-outlined ${iconTextColor}`}>{iconName}</span>
          </div>
          <div>
            <p className="text-white font-semibold">{title}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <span className="font-mono text-white font-bold">{amount}</span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${networkColor}`}></div>
          <span className="text-xs font-medium text-on-surface-variant">{networkName}</span>
        </div>
      </td>
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-5">
        <a
          className="font-mono text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
          href="#"
        >
          {hash}
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </a>
      </td>
      <td className="px-6 py-5 text-xs text-slate-500">{date}</td>
    </tr>
  );
}
