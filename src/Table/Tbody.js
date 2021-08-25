const Tbody = props => (
    <tbody>
        {
            props.markets.map((market, i) => {
                return (
                    <tr key={market.timestamp + Math.random()}>
                        <td className="border-3">
                            { Object.keys(market.rates)[i] + '/' + market.base }
                        </td>
                        {
                            props.markets.map(market => {
                                props.markets.map(item => item.min = false)

                                // Отношение данной валюты к базовой
                                let rate = Object.values(market.rates)[i];
                                // Массив этих отношений
                                let ratesArr = props.markets.map(item => +(Object.values(item.rates)[i]).toFixed(2));
                                // Индекс рынка(строки) с минимальным отношением
                                let indexOfMinRate = ratesArr.indexOf(Math.min.apply(null, ratesArr));

                                // Добавляем метку о минимальном значении
                                props.markets[indexOfMinRate].min = true;

                                return (
                                    <td className={market.min ? "border-3 bg-primary text-white" : "border-3"} key={market.timestamp + Math.random()}>
                                        { rate.toFixed(2) }
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            })
        }
        {
            props.markets.map((market, i) => {
                let y = 0;
                if (i === props.markets.length - 1) {
                    i = 0;
                    y = props.markets.length - 1;
                }

                return (
                    <tr key={market.timestamp + Math.random()}>
                        <td className="border-3">
                            { Object.keys(market.rates)[y] + '/' + Object.keys(market.rates)[i+1] }
                        </td>
                        {
                            props.markets.map(market => {
                                // Убираем метки о минимальном значении
                                props.markets.map(item => item.min = false)

                                // Отношение одной валюты к другой
                                let rate = Object.values(market.rates)[y] / Object.values(market.rates)[i+1];
                                // Массив этих отношений
                                let ratesArr = props.markets.map(item => +(Object.values(item.rates)[y] / Object.values(item.rates)[i+1]).toFixed(2));
                                // Индекс рынка(строки) с минимальным отношением
                                let indexOfMinRate = ratesArr.indexOf(Math.min.apply(null, ratesArr));

                                // Добавляем метку о минимальном значении
                                props.markets[indexOfMinRate].min = true;

                                return (
                                    <td className={market.min ? "border-3 bg-primary text-white" : "border-3"} key={market.timestamp + Math.random()}>
                                        { rate.toFixed(2) }
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            })
        }         
    </tbody>
)

export default Tbody
