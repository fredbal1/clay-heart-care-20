
import React, { useState } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { 
  User, 
  Mail, 
  Lock, 
  Upload, 
  Check, 
  LogOut, 
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [userPhoto, setUserPhoto] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: 'Clara Martin',
    email: 'clara.martin@exemple.com',
    phone: '06 12 34 56 78',
    address: '15 rue des Lilas, 75014 Paris'
  })
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSaving(false)
    setIsEditing(false)
    
    toast({
      title: "Profil mis à jour ! ✨",
      description: "Vos informations ont été sauvegardées avec succès.",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUserPhoto(file)
    }
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-bubble-up animate">
          Mon Profil
        </h1>
        <p className="text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      {/* Avatar Section */}
      <ClayCard className="animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
        <ClayCardContent className="text-center py-8">
          <div className="relative inline-block mb-4">
            <ClayAvatar size="xl" className="h-24 w-24 clay-floating">
              {userPhoto ? (
                <ClayAvatarImage src={URL.createObjectURL(userPhoto)} alt="Profil" />
              ) : (
                <ClayAvatarImage 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400" 
                  alt="Clara Martin" 
                />
              )}
              <ClayAvatarFallback>
                <User className="h-8 w-8" />
              </ClayAvatarFallback>
            </ClayAvatar>
            
            {isEditing && (
              <div className="absolute -bottom-2 -right-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="h-8 w-8 clay-floating rounded-full bg-primary flex items-center justify-center cursor-pointer hover:clay-pressed transition-all">
                  <Upload className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-semibold">{formData.name}</h2>
          <p className="text-muted-foreground">{formData.email}</p>
        </ClayCardContent>
      </ClayCard>

      {/* Personal Information */}
      <ClayCard className="animate-soft-bounce" style={{'--delay': '600ms'} as React.CSSProperties}>
        <ClayCardHeader>
          <div className="flex items-center justify-between">
            <ClayCardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </ClayCardTitle>
            {!isEditing ? (
              <ClayButton
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </ClayButton>
            ) : (
              <div className="flex gap-2">
                <ClayButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4" />
                </ClayButton>
                <ClayButton
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Sauvegarde...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </ClayButton>
              </div>
            )}
          </div>
        </ClayCardHeader>
        
        <ClayCardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom complet</label>
              {isEditing ? (
                <ClayInput
                  value={formData.name}
                  onChange={handleInputChange('name')}
                />
              ) : (
                <div className="clay-pressed p-3 rounded-clay bg-muted/50">
                  {formData.name}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              {isEditing ? (
                <ClayInput
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                />
              ) : (
                <div className="clay-pressed p-3 rounded-clay bg-muted/50">
                  {formData.email}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              {isEditing ? (
                <ClayInput
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                />
              ) : (
                <div className="clay-pressed p-3 rounded-clay bg-muted/50">
                  {formData.phone}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Adresse</label>
              {isEditing ? (
                <ClayInput
                  value={formData.address}
                  onChange={handleInputChange('address')}
                />
              ) : (
                <div className="clay-pressed p-3 rounded-clay bg-muted/50">
                  {formData.address}
                </div>
              )}
            </div>
          </div>
        </ClayCardContent>
      </ClayCard>

      {/* Security */}
      <ClayCard className="animate-soft-bounce" style={{'--delay': '800ms'} as React.CSSProperties}>
        <ClayCardHeader>
          <ClayCardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Sécurité
          </ClayCardTitle>
        </ClayCardHeader>
        
        <ClayCardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 clay-subtle rounded-clay">
            <div>
              <p className="font-medium">Mot de passe</p>
              <p className="text-sm text-muted-foreground">
                Dernière modification il y a 3 mois
              </p>
            </div>
            <ClayButton variant="outline">
              Changer le mot de passe
            </ClayButton>
          </div>
          
          <div className="flex items-center justify-between p-4 clay-subtle rounded-clay">
            <div>
              <p className="font-medium">Authentification à deux facteurs</p>
              <p className="text-sm text-muted-foreground">
                Ajoutez une couche de sécurité supplémentaire
              </p>
            </div>
            <ClayButton variant="outline">
              Configurer
            </ClayButton>
          </div>
        </ClayCardContent>
      </ClayCard>

      {/* Account Actions */}
      <ClayCard className="animate-soft-bounce" style={{'--delay': '1000ms'} as React.CSSProperties}>
        <ClayCardHeader>
          <ClayCardTitle>Actions du compte</ClayCardTitle>
        </ClayCardHeader>
        
        <ClayCardContent className="space-y-4">
          <ClayButton 
            variant="secondary" 
            className="w-full justify-start"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Se déconnecter
          </ClayButton>
          
          <ClayButton 
            variant="error" 
            className="w-full justify-start"
          >
            <Trash2 className="h-4 w-4 mr-3" />
            Supprimer mon compte
          </ClayButton>
        </ClayCardContent>
      </ClayCard>
    </div>
  )
}
