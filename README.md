## testing 
mycket tester för att returnera rätt värde och att få chaining att fungera

## check decimals

om number är större än 1  (=  inte 0.001) och decimalerna är satta till 0 -> ingen untantagsregel gäller, retunera number, lägga till math.floor/math.ceil senare???

gör om till string för att räkna ut vart . sitter
om ingen . returnera number

while loop för att kolla hur många 0 efter . 
decimalsNeeded === skillnaden mellan fösta incke 0an och index för decimaltecken, om inga 0 hittas visa 1 decimal

kolla om decimaler är satta till 0 och number är mindre än 1
returnera antalet decimaler som behövs för att visa annat än 0

om inga decimaler är satta, visas 2 decimaler
kolla decimalsSetByUser satta mot decimalsNeeded för att se vilken som behövs användas = finalDecimals

fakorera finalDecimals med math.pow för att göra om till heltal och sedan ta bort decimaler för att sedan dividera tillbaks till rätt tal och behålla decimaler. 

// import {} if using ecma script module, otherwise?