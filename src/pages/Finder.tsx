import { useParams } from "react-router-dom";

export default function Finder() {
    const { searchElement } = useParams<{ searchElement: string }>();
    console.log(searchElement);

    return (<div><br /><br /><br /><br />{searchElement}</div>);

}