import { useParams } from "react-router-dom";
import CheckAndTitle from "../components/CheckAndTitle";

export default function Finder() {

    // Variables ----------------------------------------------------------------------

    const { searchElement } = useParams<{ searchElement: string }>();

    // UseEffect ----------------------------------------------------------------------
    // Functions ----------------------------------------------------------------------

    return (
        <CheckAndTitle title={'Search'}>
            <br /><br /><br /><br />{searchElement}
        </CheckAndTitle>
    );

}