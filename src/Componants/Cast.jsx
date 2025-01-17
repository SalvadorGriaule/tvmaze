import { useState } from "react";
import { useEffect } from "react";

function Cast({ link }) {

    const [result, setResult] = useState("")

    useEffect(() => {

        fetch(link + "/cast").then((val) => { return val.json() }).then(val => setResult(val))
    }, [])

    return (
        <div className="bg-slate-300 p-2 rounded-md">
            <p>Cast:</p>
            <div className="space-x-2 flex flex-row flex-wrap ">
                {result && result.map((elem) => (
                    <p>{elem.person.name}</p>
                ))}
            </div>
        </div>
    )

}

export default Cast