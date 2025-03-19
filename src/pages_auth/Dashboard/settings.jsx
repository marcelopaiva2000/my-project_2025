import { MdPhotoCamera } from "react-icons/md";
import AvatarUpload from "./avatars";
import { useAuth } from '../../context/AuthProvider'

export default function Settings() {
    // const [avatar, setAvatar] = useState(null);

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setAvatar(URL.createObjectURL(file)); // Define a imagem diretamente
    //     }
    // };
    const { session } = useAuth();
    const { user } = session;

    return (
      <div className="flex flex-col items-center py-10">
        <h1 className="text-3xl font-medium">Configurações do usuário</h1>

        <div className="flex flex-col gap-2 items-center mt-10">
          <AvatarUpload userId={user.id} />

          <p className="text-gray-500 text-[12px]">
            Clique para alterar a foto
          </p>
        </div>
      </div>
    );
}