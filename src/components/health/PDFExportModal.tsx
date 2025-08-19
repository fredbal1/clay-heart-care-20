
import React from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Download, FileText, X, Printer, Share } from 'lucide-react'

export function PDFExportModal() {
  const handleDownload = () => {
    // Simuler le téléchargement du PDF
    console.log('Téléchargement du PDF...')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    // Simuler le partage
    console.log('Partage du dossier...')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ClayButton className="animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
          <Download className="h-4 w-4 mr-2" />
          Exporter en PDF
        </ClayButton>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-soft-bounce">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Aperçu du Dossier Santé - Milo
          </DialogTitle>
          <div className="flex gap-2">
            <ClayButton variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </ClayButton>
            <ClayButton variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              Partager
            </ClayButton>
            <ClayButton onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </ClayButton>
          </div>
        </DialogHeader>

        {/* Aperçu du PDF */}
        <div className="space-y-6 p-6 bg-white text-black min-h-[800px]" style={{ fontFamily: 'serif' }}>
          {/* Header du dossier */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dossier Médical - Milo</h1>
                <p className="text-gray-600">Golden Retriever • Mâle castré • 3 ans</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Généré le {new Date().toLocaleDateString('fr-FR')}</p>
              <p>AnimaHub - Carnet de Santé Digital</p>
            </div>
          </div>

          {/* Informations générales */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-900">Informations Générales</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Nom:</span>
                  <span>Milo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Race:</span>
                  <span>Golden Retriever</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sexe:</span>
                  <span>Mâle castré</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Âge:</span>
                  <span>3 ans</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Poids actuel:</span>
                  <span>29.2 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Puce électronique:</span>
                  <span>250268500123456</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-900">Vétérinaire Référent</h2>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Dr. Marie Dubois</span></div>
                <div>Clinique Vétérinaire des Lilas</div>
                <div>📞 01 45 67 89 12</div>
                <div>📧 contact@clinique-lilas.fr</div>
              </div>
              
              <h2 className="text-lg font-semibold mb-3 mt-6 text-gray-900">Assurance</h2>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">SantéVet Premium</span></div>
                <div>Contrat: SV2024789123</div>
                <div>Remboursement: 90% - Franchise: 50€</div>
              </div>
            </div>
          </div>

          {/* Vaccinations */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Historique des Vaccinations</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Vaccination</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Prochaine</th>
                  <th className="border border-gray-300 p-2 text-left">Vétérinaire</th>
                  <th className="border border-gray-300 p-2 text-left">Statut</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 p-2">Rage</td>
                  <td className="border border-gray-300 p-2">15/03/2024</td>
                  <td className="border border-gray-300 p-2">15/03/2025</td>
                  <td className="border border-gray-300 p-2">Dr. Marie Dubois</td>
                  <td className="border border-gray-300 p-2">✅ À jour</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">CHPP</td>
                  <td className="border border-gray-300 p-2">10/02/2024</td>
                  <td className="border border-gray-300 p-2">10/02/2025</td>
                  <td className="border border-gray-300 p-2">Dr. Marie Dubois</td>
                  <td className="border border-gray-300 p-2">✅ À jour</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Leishmaniose</td>
                  <td className="border border-gray-300 p-2">20/11/2023</td>
                  <td className="border border-gray-300 p-2">20/11/2024</td>
                  <td className="border border-gray-300 p-2">Dr. Thomas Bernard</td>
                  <td className="border border-gray-300 p-2">⚠️ Bientôt échu</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Traitements */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Traitements en Cours</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Traitement</th>
                  <th className="border border-gray-300 p-2 text-left">Fréquence</th>
                  <th className="border border-gray-300 p-2 text-left">Dernière admin.</th>
                  <th className="border border-gray-300 p-2 text-left">Prochaine</th>
                  <th className="border border-gray-300 p-2 text-left">Statut</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 p-2">Milbemax (Vermifuge)</td>
                  <td className="border border-gray-300 p-2">Tous les 3 mois</td>
                  <td className="border border-gray-300 p-2">15/01/2024</td>
                  <td className="border border-gray-300 p-2">15/04/2024</td>
                  <td className="border border-gray-300 p-2">🔄 En cours</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Frontline (Anti-puces/tiques)</td>
                  <td className="border border-gray-300 p-2">Mensuel</td>
                  <td className="border border-gray-300 p-2">01/03/2024</td>
                  <td className="border border-gray-300 p-2">01/04/2024</td>
                  <td className="border border-gray-300 p-2">✅ À jour</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notes importantes */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Notes Importantes</h2>
            <div className="space-y-2 text-sm bg-yellow-50 p-4 rounded border">
              <div><strong>Allergie alimentaire:</strong> Réaction allergique au poulet confirmée. Éviter tous les aliments à base de volaille.</div>
              <div><strong>Comportement récent:</strong> Milo semble un peu fatigué ces derniers jours. À surveiller.</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
