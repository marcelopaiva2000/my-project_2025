import NavBar from '../Dashboard/navBar'
import { Routes, Route} from 'react-router-dom'
import Home from './home'
import Tables from './tables'
import Settings from './settings'
import Pacientes from './pacientes'

export default function Dashboard() {

    return (
        <div className='flex h-screen bg-gray-200'>
            <NavBar />
            <div className='flex-1 pt-28'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='tabelas' element={<Tables />} />
                    <Route path='configuracoes' element={<Settings />} />
                    <Route path='pacientes' element={<Pacientes />} />
                </Routes>
            </div>
        </div>
    )
}