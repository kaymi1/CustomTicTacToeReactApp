function Choice(props) {
    return (
        <button className="button_choice"
                onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}

export default Choice;