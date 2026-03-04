import React, { useState, memo } from 'react';
import {
  RocketIcon,
  ServerIcon,
  SaveIcon,
  CheckCircleIcon,
  TerminalIcon } from
'lucide-react';
import { DEFAULT_DOCKER, DEFAULT_VPS } from '../../data/infrastructureStore';
import type { DockerConfig, VPSConfig } from '../../types/infrastructure';
export function DeploymentPanel() {
  const [docker, setDocker] = useState<DockerConfig>(DEFAULT_DOCKER);
  const [vps, setVps] = useState<VPSConfig>(DEFAULT_VPS);
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  const generateComposePreview = () => {
    return `version: '3.8'
services:
  app:
    image: ${docker.registryUrl ? `${docker.registryUrl}/` : ''}${docker.imageName}:${docker.imageTag}
    restart: ${docker.restartPolicy}
    network_mode: "${docker.networkMode}"
    ports:
${docker.ports.map((p) => `      - "${p.host}:${p.container}"`).join('\n')}
    volumes:
${docker.volumes.map((v) => `      - ${v.hostPath}:${v.containerPath}`).join('\n')}
    env_file:
      - ${docker.envFile}
    deploy:
      resources:
        limits:
          cpus: '${docker.cpuLimit}'
          memory: ${docker.memoryLimit}
    healthcheck:
      test: ["CMD-SHELL", "${docker.healthCheckCmd}"]
      interval: ${docker.healthCheckInterval}s
      timeout: 10s
      retries: 3`;
  };
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Deployment & VPS
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Configura i container Docker e i server di produzione
          </p>
        </div>
        <div className="flex gap-3">
          <button className="font-sans font-semibold text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <RocketIcon size={16} />
            Deploy to VPS
          </button>
          <button
            onClick={handleSave}
            className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            {isSaved ? <CheckCircleIcon size={16} /> : <SaveIcon size={16} />}
            {isSaved ? 'Salvato' : 'Salva Configurazione'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* VPS Configuration */}
        <div
          className="bg-white border border-gray-200 rounded p-6"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <ServerIcon className="text-gray-400" size={24} />
            <div>
              <h3 className="font-sans font-semibold text-gray-900">
                Configurazione VPS
              </h3>
              <p className="font-mono text-xs text-gray-500">
                Dettagli del server di destinazione
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Provider
                </label>
                <input
                  type="text"
                  value={vps.provider}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    provider: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Indirizzo IP
                </label>
                <input
                  type="text"
                  value={vps.ipAddress}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    ipAddress: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 font-mono focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Utente SSH
                </label>
                <input
                  type="text"
                  value={vps.sshUser}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    sshUser: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Porta SSH
                </label>
                <input
                  type="number"
                  value={vps.sshPort}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    sshPort: parseInt(e.target.value)
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  OS
                </label>
                <input
                  type="text"
                  value={vps.os}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    os: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
            </div>

            <div>
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                Percorso Chiave SSH
              </label>
              <input
                type="text"
                value={vps.sshKeyPath}
                onChange={(e) =>
                setVps({
                  ...vps,
                  sshKeyPath: e.target.value
                })
                }
                className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 font-mono focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Dominio
                </label>
                <input
                  type="text"
                  value={vps.domain}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    domain: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Reverse Proxy
                </label>
                <select
                  value={vps.reverseProxy}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    reverseProxy: e.target.value as any
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  <option value="nginx">NGINX</option>
                  <option value="caddy">Caddy</option>
                  <option value="traefik">Traefik</option>
                  <option value="apache">Apache</option>
                  <option value="none">Nessuno</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vps.firewallEnabled}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    firewallEnabled: e.target.checked
                  })
                  }
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-sm text-gray-700">
                  Abilita Firewall (UFW)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vps.monitoringEnabled}
                  onChange={(e) =>
                  setVps({
                    ...vps,
                    monitoringEnabled: e.target.checked
                  })
                  }
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-sm text-gray-700">
                  Installa agent di monitoraggio
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Docker Configuration */}
        <div
          className="bg-white border border-gray-200 rounded p-6"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <TerminalIcon className="text-gray-400" size={24} />
            <div>
              <h3 className="font-sans font-semibold text-gray-900">
                Configurazione Docker
              </h3>
              <p className="font-mono text-xs text-gray-500">
                Impostazioni per il container dell'app
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Nome Immagine
                </label>
                <input
                  type="text"
                  value={docker.imageName}
                  onChange={(e) =>
                  setDocker({
                    ...docker,
                    imageName: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Tag
                </label>
                <input
                  type="text"
                  value={docker.imageTag}
                  onChange={(e) =>
                  setDocker({
                    ...docker,
                    imageTag: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Restart Policy
                </label>
                <select
                  value={docker.restartPolicy}
                  onChange={(e) =>
                  setDocker({
                    ...docker,
                    restartPolicy: e.target.value as any
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  <option value="always">always</option>
                  <option value="unless-stopped">unless-stopped</option>
                  <option value="on-failure">on-failure</option>
                  <option value="no">no</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Network Mode
                </label>
                <select
                  value={docker.networkMode}
                  onChange={(e) =>
                  setDocker({
                    ...docker,
                    networkMode: e.target.value as any
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  <option value="bridge">bridge</option>
                  <option value="host">host</option>
                  <option value="none">none</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Memory Limit
                </label>
                <input
                  type="text"
                  value={docker.memoryLimit}
                  onChange={(e) =>
                  setDocker({
                    ...docker,
                    memoryLimit: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  CPU Limit
                </label>
                <input
                  type="text"
                  value={docker.cpuLimit}
                  onChange={(e) =>
                  setDocker({
                    ...docker,
                    cpuLimit: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
            </div>

            <div>
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                Health Check Command
              </label>
              <input
                type="text"
                value={docker.healthCheckCmd}
                onChange={(e) =>
                setDocker({
                  ...docker,
                  healthCheckCmd: e.target.value
                })
                }
                className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 font-mono focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

            </div>
          </div>
        </div>

        {/* Compose Preview */}
        <div className="xl:col-span-2 bg-gray-900 rounded p-6 text-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-sm font-bold text-white">
              docker-compose.yml (Preview)
            </h3>
            <button className="font-mono text-xs px-3 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              Copia
            </button>
          </div>
          <pre className="font-mono text-xs overflow-x-auto whitespace-pre-wrap">
            {generateComposePreview()}
          </pre>
        </div>
      </div>
    </div>);

}