import { useParams } from 'react-router-dom';


function ShopProfile() {
    const { id } = useParams();

    return (<div>Hello world
        <p>{id}</p>
    </div>)

}

export default ShopProfile;