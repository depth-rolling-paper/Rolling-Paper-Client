import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContainer } from './App.style';
import MainPage from './components/pages/MainPage';
import CreateRoomPage from './components/pages/CreateRoomPage';
import EnterRoomPage from './components/pages/EnterRoomPage';
import WritePaperPage from './components/pages/WritePaperPage';
import DeliverPaperPage from './components/pages/DeliverPaperPage';

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/room/:url" element={<EnterRoomPage />} />
          <Route path="/room/:url/write" element={<WritePaperPage />} />
          <Route path="/room/:url/deliver" element={<DeliverPaperPage />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
