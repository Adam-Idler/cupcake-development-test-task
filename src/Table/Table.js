import Tbody from "./Tbody"

const Table = props => (
    <table className="table table-striped table-bordered border-secondary border-3">
        <thead>
            <tr>
                <th className="border-secondary border-3">Pair name/market</th>
                <th className="border-secondary border-3">First</th>
                <th className="border-secondary border-3">Second</th>
                <th className="border-secondary border-3">Third</th>
            </tr>
        </thead>
        <Tbody
            markets={props.markets}
        />
    </table>
)

export default Table;
