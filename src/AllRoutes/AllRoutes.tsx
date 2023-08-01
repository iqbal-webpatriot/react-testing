import { Routes, Route } from 'react-router-dom';
import Application from '../components/Application/Application';
import Counter from '../components/Counter/Counter';
import Login from '../Auth/Login/Login';

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Application />} />
        {/* <Route path='/skills' element={<Skills skills={dummySkills}/>}/> */}
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
