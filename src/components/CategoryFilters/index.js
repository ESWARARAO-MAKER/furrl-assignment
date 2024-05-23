import "./index.css"


export const CategoryFilters = (props) => {
    const {item, activeFilter, activeFilterChange} = props;
    const {name} = item

    const tabChanged = () => {
        activeFilterChange(item);
    }
    return(
        <li onClick={tabChanged} className={`tab ${activeFilter !== null && activeFilter.uniqueId === item.uniqueId && 'active-tab'}`}>{name}</li>
    )
}