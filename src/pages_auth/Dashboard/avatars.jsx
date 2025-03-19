import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { MdPhotoCamera } from "react-icons/md";

const AvatarUpload = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Buscar o avatar do usuário ao carregar o componente
  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(`avatars/${userId}.png`);


      console.log('Data:', data)  
      setAvatarUrl(data.publicUrl);
    };

    fetchAvatar();
  }, [userId]);

  // Função para fazer o upload do arquivo
  const handleUpload = async (event) => {
    let file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Erro ao fazer upload:", error.message);
      setUploading(false);
      return;
    }

  };

  return (
      <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center group">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border border-gray-100"
          />
        ) : (
          <span className="text-gray-500">Sem imagem</span>
        )}

        {/* Hover Overlay */}
        <label className="absolute inset-0 bg-gray-500 text-white flex items-center justify-center rounded-full opacity-0 hover:opacity-80 cursor-pointer transition-opacity">
          <MdPhotoCamera size={40} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
  );
};

export default AvatarUpload;
