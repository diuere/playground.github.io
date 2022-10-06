import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { footerObserver, hamburgerIconObserver, headerObserver, pageObserver } from "./store/observers";
import { toggleMenu } from "./store/functions";

import Header from "./components/Header";
import Hero from "./pages/Hero";
import TenzyPage from "./pages/TenzyPage";
import MemeGeneratorPage from "./pages/MemeGeneratorPage";
import TicTacToePage from "./pages/TicTacToePage";
import Footer from "./components/Footer";
import QuizGamePage from "./pages/QuizGamePage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => pageObserver(page));
    
    headerObserver({ toggleMenu });
    hamburgerIconObserver({ toggleMenu });
    footerObserver();
    
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Hero />}/>
            <Route path="/tenzyGame" element={<TenzyPage />}/>
            <Route path="/ticTacToePage" element={<TicTacToePage />}/>
            <Route path="/quizGamePage" element={<QuizGamePage />}/>
            <Route path="/memeGeneratorPage" element={<MemeGeneratorPage />}/>
            <Route path="/contactPage" element={<ContactPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left"/>
    </QueryClientProvider>
    );
}

export default App;
