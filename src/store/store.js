import create from "zustand";
import { persist } from "zustand/middleware"
import { getMemeTemplate, handleDeleteTemplate } from "./functions"; // function that hold the data for each template of useMemeGeneratorStore

export const useTenzyStore = create((set) => (
    {
        hold: "", // state that will hold the first click value
        setHold: (value) => set({ hold: value ? value : "" }),

        roll: 0, // state that will count the roll action
        setRoll: (value) => set(store => ({ roll: value ? store.roll + value : 0, })),

        gameTime: 0, // state for the countdown
        setGameTime: (value) => set(store => ({ gameTime: value ? store.gameTime + value : 0})),

        addFav: true,
        setAddFav: (value) => set({ addFav: value, }),
    }
))




export const useMemeGeneratorStore = create((set) => (
    {
        templates: [getMemeTemplate(0)],
        updateTemplates: (value) => set({ templates: value }),

        addTemplate: (value) => set(store => ({ templates: [...store.templates, value], })),
        deleteTemplate: (id) => set(store => ({ templates: handleDeleteTemplate(store.templates, id), })),
    }
))




export const useQuizGameTimeStore = create((set) => (
    {
        timeLimit: 30,
        setTimeLimit: (value) => set( { timeLimit: value, } ),

        counter: 30,
        setCounter: (value) => set( { counter: value, } ),
        decreaseCounter: () => set(store => ( { counter: store.counter - 1 } ) ),
    }
))



let quizGamePlayersStore = (set) => ( 
    { 
        players: {
            "easy": {
                "30": [],
                "60": []
            },
            "medium": {
                "30": [],
                "60": []
            },
            "hard": {
                "30": [],
                "60": []
            }
        },
        setPlayers: (value) => set( { players: value, } ),
    } 
)
quizGamePlayersStore = persist(
    quizGamePlayersStore,
    {
        name: 'quiz-players-storage', // unique name
    }    
);

export const useQuizGamePlayersStore = create(quizGamePlayersStore);


export const useQuizGamePlayerStore = create(set => (
    {
        player: {
            name: "",
            score: 0,
            difficulty: "",
            time: 0,
        },
        setPlayerName: (value) => set(store => ( { player: {...store.player, name: value }, } )),
        addPlayerScore: () => set(store => ( { player: { ...store.player, score: store.player.score + 100 },  })),
        addPlayerDifficulty: (value) => set(store => ( { player: { ...store.player, difficulty: value },  })),
        addPlayerTime: (value) => set(store => ( { player: { ...store.player, time: value },  })),
        resetPlayer: () => set( { player: { name: "", score: 0, difficulty: "", time: 0, }, } ),

        playerSelected: false,
        setPlayerSelected: (booleanState) => set( {playerSelected: booleanState, } ),
    }
))