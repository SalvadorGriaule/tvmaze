import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Cast from "./Cast";

function Result({ catg, search }) {

    let query = useRef("")
    const [result, setResult] = useState("")

    useEffect(() => {
        console.log(catg);

        switch (catg) {
            case "Nom":
                query.current = "https://api.tvmaze.com/search/shows?q=" + search
                break;
            case "acteur":
                query.current = "https://api.tvmaze.com/search/people?q=" + search
                break;
            default:
                break;
        }
        fetch(query.current).then((val) => { return val.json() }).then(val => setResult(val))
    }, [catg, search])
    if (catg == "Nom") {
        return (
            <div className="space-y-4 p-2">
                {result && result.map((elem) => (
                    <div className="flex flex-row py-1">
                        {elem.show.image && (<div className="w-1/6"><img className="w-full" src={elem.show.image.medium} alt="" /></div>)}
                        <div className="w-5/6 px-2 space-y-2 border-b-2 border-black border-solid">
                            <p>{elem.show.name}</p>
                            <div className="flex flex-row space-x-2">{elem.show.genres.map((tab) => (<p>{tab}</p>))}</div>
                            <div>{elem.show.network && (
                                <div className="space-y-2">
                                    <p>{elem.show.network.country.name}</p>
                                    <a className="text-blue-600" href={elem.show.network.officialSite}>{elem.show.network.officialSite}</a>
                                </div>
                            )}</div>
                            {elem.show.webChannel && (
                                <div>
                                    <p>{elem.show.webChannel.name}</p>
                                    <a className="text-blue-600" href={elem.show.webChannel.officialSite}>{elem.show.webChannel.officialSite}</a>
                                </div>
                            )}
                            <div>{elem.show.summary && elem.show.summary.replace("<p>", "").replace("</p>", "").replace("</b>", "").replace("<b>", "")}</div>
                            <Cast link={elem.show._links.self.href} />
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div className="space-y-4 p-2">
                {result && result.map((elem) => (
                    <div className="flex flex-row py-1">
                        {elem.person.image && (<div className="w-1/6"><img className="w-full" src={elem.person.image.medium} alt="" /></div>)}
                        <div className="w-5/6 px-2 space-y-2 border-b-2 border-black border-solid">
                            <p>{elem.person.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

export default Result