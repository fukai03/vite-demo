import axios from "axios";

function MyButton() {
    
    const requestClick = () => {
        axios.get('/api/get').then(res => {
            console.log(res);
        })
    }
    const requestProxy = () => {
        axios.get('/api1/posts/1')
        .then((res) => console.log(res))
    }
    return (
        <div className="btn">
            <button onClick={requestClick}>点击发送请求</button>
            <button onClick={requestProxy}>发送代理请求</button>
        </div>
    )
}
export default MyButton