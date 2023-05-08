import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import WorkSpace from './components/WorkSpace/WorkSpace';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WorkSpaseTextArea from './components/WorkSpaseTextArea/WorkSpaseTextArea';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className='main-block'>
				<Sidebar />

				<Routes>
					<Route path='/' element={<WorkSpace />}>
						<Route path='/:noteId' element={<WorkSpaseTextArea />} />
						<Route path='/add-note' element={<WorkSpaseTextArea />} />
					</Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
