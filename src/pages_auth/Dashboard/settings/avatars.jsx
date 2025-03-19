import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabaseClient";
import { MdPhotoCamera } from "react-icons/md";

const AvatarUpload = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarPath, setAvatarPath] = useState(null); // Armazena o caminho do avatar atual

  // Buscar o avatar do usuário ao carregar o componente
  useEffect(() => {
    async function fetchAvatar() {
      const { data, error } = await supabase.storage
        .from("avatars")
        .list();

      if (error) {
        console.error("Erro ao buscar avatar:", error);
        return;
      }

      // Filtra a imagem do usuário
      const userAvatar = data.find((file) => file.name.includes(userId));

      if (userAvatar) {
        const { data: publicUrl } = supabase
          .storage
          .from("avatars")
          .getPublicUrl(userAvatar.name);

        setAvatarUrl(publicUrl.publicUrl);
        setAvatarPath(userAvatar.name); // Salva o caminho do avatar
      }
    }

    fetchAvatar();
  }, [userId]);

  // Função para fazer o upload do arquivo
  const handleUpload = async (event) => {
    let file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    // Se já existir um avatar, exclua antes de fazer o upload
    if (avatarPath) {
      await supabase.storage.from("avatars").remove([avatarPath]);
    }

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Erro ao fazer upload:", error.message);
      setUploading(false);
      return;
    }

    // Atualiza a URL do avatar
    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    setAvatarUrl(publicUrl.publicUrl);
    setAvatarPath(filePath); // Atualiza o caminho do avatar
    setUploading(false);

    window.location.reload();
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
