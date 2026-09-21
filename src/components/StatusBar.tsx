import { IconBuild, IconCheck, IconCommit, IconGitBranch, IconPuzzle, IconShield } from './icons'

export function StatusBar() {
  return (
    <footer className="statusbar">
      <button className="status-item branch">
        <span className="glyph">
          <IconGitBranch size={12} />
        </span>
        main
      </button>
      <button className="status-item">
        <span className="indicator">0</span>
        erros
      </button>
      <button className="status-item">
        <span className="indicator warn">0</span>
        warnings
      </button>

      <div className="status-spacer" />

      <button className="status-item">
        <span className="glyph">
          <IconCommit size={12} />
        </span>
        Git
        <span className="indicator">
          <IconCheck size={10} />
        </span>
      </button>
      <button className="status-item">
        <span className="glyph">
          <IconBuild size={12} />
        </span>
        Build
        <span className="indicator">
          <IconCheck size={10} />
        </span>
      </button>
      <button className="status-item">
        <span className="glyph">
          <IconShield size={12} />
        </span>
        Security
        <span className="indicator">
          <IconCheck size={10} />
        </span>
      </button>
      <div className="status-sep" />
      <button className="status-item">
        <span className="glyph">
          <IconPuzzle size={12} />
        </span>
        Integrations
      </button>
      <button className="status-item">workspace</button>
    </footer>
  )
}