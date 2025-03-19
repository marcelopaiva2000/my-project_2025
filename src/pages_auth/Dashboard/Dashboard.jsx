import NavBar from '../Dashboard/navBar'
import { Routes, Route} from 'react-router-dom'
import Home from './home'
import Tables from './tables'
import Settings from './settings/settings'
import Pacientes from './pacientes'

export default function Dashboard() {

    return (
        <div className='flex h-full bg-white'>
            <NavBar />
            <div className='pt-32 pl-70 flex w-full h-full pb-4 pr-4'>
                <div className='w-full h-full bg-white rounded-lg shadow-2xl'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='tabelas' element={<Tables />} />
                        <Route path='configuracoes' element={<Settings />} />
                        <Route path='pacientes' element={<Pacientes />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}