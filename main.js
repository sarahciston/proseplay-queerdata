import './style.css'
import { ProsePlay} from "proseplay"
import { OpenWebTexts, OneTexts } from './results.js'

let docs = OpenWebTexts

function fetchIt(){
    pass
}

Array.prototype.random = function (){
    return this[Math.floor((Math.random()*this.length))]
}

function makePP(){
    const el = document.createElement('div')
    el.classList.add("databox")
    document.body.appendChild(el)
    
    const pp = new ProsePlay(el)
    return pp
}

function swapAll(pp){
    // slides every entry at once
    pp.choices.forEach((list, choice)=>{
        let len = list.length
        let current = pp.currentIndexes[choice]
        let next = current+1
        // console.log(current)

        if (current < len-1){
            pp.slideWindow(choice,next)
        } else {
            // pp.currentIndexes[choice] = 0
            next = 0
            pp.slideWindow(choice,next)
        }
    })
}

function swapRandom(pp){
    // select random entry
    let randomPP = pp.random()
    
    // slide to next item -- could make this a randomizer instead but eh?
    randomPP.choices.forEach((list, choice)=>{
        let current = randomPP.currentIndexes[choice]
        let next = current+1
        let len = list.length

        // check if reached end of list
        if (next > len-1){
            console.log("end")
            next = 0
        }
        // RANDOM FROM WHOLE LIST
        // // // let randomWord = list.random()
        let rWindex = Math.floor((Math.random()*list.length))
        randomPP.slideWindow(choice,rWindex)

        // NEXT IN LIST
        // randomPP.slideWindow(choice,next)
    })
}

function turnLight() {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}

function turnDark() {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
}

function main(){
    // docs.length
    let ppList = []
    
    docs.forEach((count, i) => {
        let pp = makePP()

        pp.parse(docs[i])
        // pp.parse(count)

        pp.setFunction("turnLight", turnLight);
        pp.setFunction("turnDark", turnDark);

        // let timer = setInterval(function() {swapAll(pp)}, 5000)
        ppList.push(pp)
        return ppList
    })
    // console.log(ppList)
    let timer = setInterval(function() {swapRandom(ppList)}, 2000)

}

main()