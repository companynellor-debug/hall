import { Paperclip, ChevronDown, SendHorizontal, Zap } from 'lucide-react';
// import { Github } from 'lucide-react'; 
import './globals.css';

export default function Page() {
  return (
    <div className="flex h-screen w-[400px] flex-col border-r border-[#222] bg-[#111111] p-4">
      {/* Header */}
      <div className="flex space-x-6 border-b border-[#222] pb-3 text-sm font-medium text-textSecondary">
        <button className="text-white border-b-2 border-white pb-3">Chat</button>
        <button>Tarefas</button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto pt-4 space-y-6">
        {/* User Message */}
        <div className="flex items-start space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">N</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Você <span className="text-xs text-textSecondary font-normal">10:24</span></p>
            <p className="text-sm text-white">Adicione uma seção de analytics no dashboard com gráfico de receita...</p>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex items-start space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">H</div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold text-white">HALL <span className="text-xs text-textSecondary font-normal">10:24</span></p>
            <div className="rounded-lg bg-[#1a1a1a] p-3 text-xs space-y-2 border border-[#222]">
              <p className="flex items-center text-green-500">✓ Analisando projeto...</p>
              <p className="flex items-center text-green-500">✓ Planejando alterações...</p>
              <p className="flex items-center text-red-500">○ Editando 3 arquivos...</p>
              <div className="ml-4 font-mono text-[11px] text-textSecondary">
                <p>src/app/dashboard/page.tsx <span className="text-green-500 ml-2">+72 -12</span></p>
                <p>src/components/RevenueChart.tsx <span className="text-green-500 ml-2">+156 -8</span></p>
                <p>src/components/MetricCard.tsx <span className="text-green-500 ml-2">+34 -4</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="border border-[#333] rounded-md px-3 py-1 text-xs text-white hover:bg-[#222]">Ver mudanças</button>
              <button className="flex items-center gap-1 border border-[#333] rounded-md px-3 py-1 text-xs text-white hover:bg-[#222]">
                Salvar no GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 border border-[#333] rounded-xl p-3 bg-[#161616]">
        <textarea 
          className="w-full bg-transparent text-sm outline-none resize-none h-16 text-white placeholder-textSecondary"
          placeholder="Descreva a alteração..."
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <button className="text-textSecondary hover:text-white"><Paperclip size={16} /></button>
            <span className="flex items-center gap-1 text-xs text-textSecondary border border-[#333] px-2 py-1 rounded cursor-pointer">
              Nakor's Project <ChevronDown size={12} />
            </span>
          </div>
          <div className="flex gap-1">
            <button className="bg-[#222] text-xs px-3 py-1 rounded-full text-white">PLAN</button>
            <button className="bg-red-600 text-xs px-3 py-1 rounded-full text-white font-bold">BUILD</button>
            <button className="flex items-center gap-1 bg-[#222] text-xs px-3 py-1 rounded-full text-white">
              <Zap size={12} /> Auto <ChevronDown size={12} />
            </button>
            <button className="bg-red-600 px-3 py-1 rounded-full text-white"><SendHorizontal size={14} /></button>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-textSecondary mt-2">Use @ para mencionar arquivos, / para comandos</p>
    </div>
  );
}
