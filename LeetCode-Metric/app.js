document.addEventListener("DOMContentLoaded", function(){
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");
    const progressClass = document.querySelector(".progress");
    const name  = document.querySelector(".name");
    const totalSolved = document.querySelector(".totalSolved");
    const ranking = document.querySelector(".ranking");
    const contribution = document.querySelector(".contribution");
    const reputation = document.querySelector(".reputation");
    
    

    //return true or false based on regex
    function validateUsername(username){
        if(username==""){ 
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) alert("Invalid username");
        return isMatching;
    }

    // to display the information on cards
    function displayCards(data){
        totalSolved.textContent = `Total Problems Solved : ${data.totalSolved}`;
        ranking.textContent = `Ranking : ${data.ranking}`;
        contribution.textContent = `Contribution Points : ${data.contributionPoints}`
        reputation.textContent =`Reputation : ${data.reputation}`;

        cardStatsContainer.style.display="flex";

    }

    function displayUserData(data){
        const easySolved = (data.easySolved/data.totalEasy)*100;
        const mediumSolved = (data.mediumSolved/data.totalMedium)*100;
        const hardSolved = (data.hardSolved/data.totalHard)*100;
        console.log(easySolved," " ,mediumSolved, " ", hardSolved);

        easyProgressCircle.style.setProperty("--progress-degree",`${easySolved}%`);
        mediumProgressCircle.style.setProperty("--progress-degree",`${hardSolved}%`);
        hardProgressCircle.style.setProperty("--progress-degree",`${mediumSolved}%`);

        easyLabel.textContent= `${data.easySolved}/${data.totalEasy}`;
        mediumLabel.textContent= `${data.mediumSolved}/${data.totalMedium}`;
        hardLabel.textContent= `${data.hardSolved}/${data.totalHard}`;

        name.style.display="block" ;

        progressClass.style.display="flex";
        // progressClass.style.flexDirection="column";

        
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchBtn.textContent ="Generating...";
            searchBtn.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user-details...");
            }
            const data = await response.json();
            console.log("user datails : ", data);
            displayUserData(data);
            displayCards(data);
            

        }
        catch(error){
            console.error("Error fetching user details:", error);
        }
        finally{
            // finally make everything normal
            searchBtn.innerHTML=`<span>Generate</span><span class="material-symbols-outlined">
                    query_stats
                    </span>`
            searchBtn.disabled = false;
            usernameInput.value="";
        }
    }

    searchBtn.addEventListener("click", ()=>{
        const username = usernameInput.value;
        name.textContent =`Welcome! ${username}`;
        // console.log(username);

        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

    // on clicking the userinput field all the details got hidded
    usernameInput.addEventListener("click",()=>{
        name.style.display="none" ;

        progressClass.style.display="none";
        cardStatsContainer.style.display="none";
    });

    // to resume and play the toggle animation
    function toggleAnimation(element) {
        const currentState = window.getComputedStyle(element).animationPlayState;
        
        if (currentState === 'running') {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    }

    name.addEventListener("click", function() {
        toggleAnimation(name); // Now the correct element is passed
    });
})

