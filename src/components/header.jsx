import Chef from "../assets/chef.svg"

export default function header(){
    return(
        <>
            <header>
                <img src={Chef} alt="chef logo" />
                <h1>Chef Bolex</h1>
            </header>
        </>
    )
}