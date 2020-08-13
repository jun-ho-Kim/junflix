import React, {useState, useEffect} from "react";
import  {useLocation, useParams, useHistory} from "react-router-dom";
import DetailPresenter from "./DetailPresenter";
import {moviesApi, tvApi} from "api";

export default function Detail() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState();
    const [externalResult, setExternalResult] = useState(true);
    const [error, setError] = useState();
    const {push} = useHistory();
    const {pathname} = useLocation();     
    const isMovie= pathname.includes("/movie/");  
    const {id} = useParams();
    // const parsedId = parseInt(id);
    // const [loading, setLoading] = useState(true);
    // const [result, setResult] = useState();
    // const [error, setError] = useState();
    // const isMovie= pathname.includes("/movie/");
    // // this.state = {
    //     result: null,
    //     error: null,
    //     loading: true,
    //     isMovie= pathname.includes("/movie/")        
    // };

    
    // async componentDidMount() {
    //     const {
    //         match: { params: { id }},
    //         history: { push },
    //     } = this.props;
    //     const {isMovie} = this.state;
    async function getDetail() {
    let result = null;
    let externalResult = null;
    // const {push} = useHistory();        
    // const {id} = useParams();
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) {
        return push("/");
    }
    // let result = null;
    try {
        if(isMovie) {
            ({data:result} = await moviesApi.movieDetail(parsedId));
            // result = request.data;            
            setResult(result);
            // console.log("movie:",result);
        } else {
            ({data:result} = await tvApi.showDetail(parsedId));
            ({data:externalResult} = await tvApi.externalId(parsedId));
            // result = request.data;
            setResult(result);
            setExternalResult(externalResult);
            // console.log("tvshow:",result);
        }
    } catch(error) {
        console.log(error);
        setError({});
        // push("/");
    } finally {
        setLoading(false);
        setResult(result);
    }
};
    useEffect(() => {
        getDetail();
    }, []);
        // console.log(this.props);
        // const {result, error, loading} = this.state;
    return <DetailPresenter
        key={id}
        id={id}
        loading={loading}
        error={error}
        result={result} 
        externalResult={externalResult}
        pathname={pathname}
        isMovie={isMovie}
        />
};