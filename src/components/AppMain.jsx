// this the AppHeader component

const AppMain = () => {
    return (
        <div className="main-div">
            <p>This is the App-header</p>
            <SelectArea />
            <ViewInfo />
        </div>
    );
};

const SelectArea = () => {
    return (
        <div className="select-area">
            <p>This is the SelectArea component</p>
        </div>
    );
}

const ViewInfo = () => {
    return (
        <div className="view-info">
            <p>This is the ViewInfo component</p>
        </div>
    );
}

export default AppMain;