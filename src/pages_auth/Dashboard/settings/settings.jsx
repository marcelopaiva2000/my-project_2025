import AvatarUpload from "./avatars";
import { useAuth } from '../../../context/AuthProvider'

export default function Settings() {
    const { session } = useAuth();
    const { user } = session;

    return (
      <div className="flex flex-col items-center py-10">
        <h1 className="text-3xl font-medium">Configurações do usuário</h1>

        <div className="flex w-full flex-col gap-2 items-center mt-10 px-14">
          <AvatarUpload userId={user.id} />

          <p className="text-gray-500 text-[12px]">
            Clique para alterar a foto
          </p>

          <div className="h-[0.08px] w-full bg-gray-200 mt-10" />

          <form className="grid grid-cols-2 gap-4 w-full mt-10"> 

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="">Nome</label>
              <input type="text" className="border rounded-[10px] px-2 py-1" value="Marcelo Augusto" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="name" className="">Nome</label>
              <input type="text" className="border rounded-[10px]"  />
            </div>

          </form>

        </div>
      </div>
    );
}