// new Year
const date : Date = new Date();
const newYear : number = date.getFullYear();
// movie Title
const getMovie = (name : string) => fetch(`http://www.omdbapi.com/?t=${name}&apikey=28b3663f`)
.then((res : Response) => res.json());

// country names
const getCountry = (name : string) => fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
.then((res : Response) => res.json()).then(data => data && data.length && data[0])

// დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და გვეტყვის რამდენი  წლის წინ გამოვიდა ეს ფილმი.

function howManyYears(movieTitle : string){
    return getMovie(movieTitle).then(movie => newYear - movie.Year)
};

howManyYears('inception').then((year : number) => console.log('filmi gamovida' + " " + year + " " + 'wlis win'));

// დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და დაგვიბრუნებს ამ  ფილმის მსახიობების სახელების მასივს (გვარების გარეშე);

function getActorsNames(movieTitle : string){
    return getMovie(movieTitle).then(movie => {
        const actors : string [] = movie.Actors.split(", ");
        const newName : string [] = [];
        for (let actor of actors){
            const result = actor.split(" ")
            const final : string = result[0];
            newName.push(final)
        }
        console.log(newName);
    })
};
getActorsNames('inception');

// დაწერეთ ფუნქცია, რომელიც დააბრუნებს იმ ქვეყნის ვალუტას, საიდანაც თქვენი  ერთერთი საყვარელი ფილმია. 
// (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული,  ავიღოთ პირველი)

function getCurrency(movie : string){
    getMovie(movie).then((movie) => {
        const countries : string [] = movie.Country.split(', ');
        const firstCountry : string = countries[0]
        getCountry(firstCountry).then(x => console.log(Object.keys(x.currencies)[0]))
    })
}

getCurrency('inception')

// 4) დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, 
// და გვეტყვის ჯამში რამდენი საათი და რამდენი წუთია ყველა ფილმის ხანგრძლივობა ერთად.
function getHours (movie1 : string , movie2 : string, movie3 : string){ 
    const movies1 = getMovie(movie1).then(x => {
        const result : string = x.Runtime.split(' ')[0];
        return Number(result) 
    })
    const movies2 = getMovie(movie2).then(x => {
        const result : string = x.Runtime.split(' ')[0];
        return Number(result)
    }) 
    const movies3 = getMovie(movie3).then(x => {
        const result : string = x.Runtime.split(' ')[0];
        return Number(result)
    })
    return Promise.all([movies1, movies2, movies3])
}

getHours('avatar', 'inception', 'batman').then(x => console.log(x))



// 5) დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და დაგვიბრუნებს იმ ქვეყნების მოსახლეობების ჯამს,
//  საიდანაც ეს ფილმებია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული, ავიღოთ პირველი)