const input = document.getElementById('input')
const btn = document.getElementById('btn')
const row = document.querySelector('.main__result')

btn.addEventListener('click', async () => {
    if (input.value === ''){
        input.placeholder = 'вы не ввели значение';
        input.style.color = 'red';
        input.style.border = '1px solid red';
    } else {
        input.style.color = null;
        input.style.border = '1px solid black';


        let body = {query: input.value};

        const request = await fetch('../', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })

        const data = await request.text();

        document.getElementById('result').innerText = data


    }
})