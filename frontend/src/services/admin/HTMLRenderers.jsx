import dateUtils from '../dateUtils';

/*************************************************/
/******** Functions to render HTML fields ********/
/*************************************************/
const HTMLRenderers = {

    /**
     * Render an editable field (<input>) if isEditing is true, or a static field if isEditing is false.
     *
     * @param isEditing - Whether the field is in editing mode.
     * @param value - The value to display in the input or static text.
     * @param fieldType - The type of the input field (e.g., 'text', 'email').
     * @param onChange - The function to call when the user types in the field.
     * @param [additionalClass] - Additional class to style the field.
     * @returns {JSX.Element} The rendered field.
     */
    renderEditableField(isEditing, value, fieldType, onChange, additionalClass = '') {

        // Add a class to the field if additionalClass is provided
        const className = "editable-field" + (additionalClass ? ` ${additionalClass}` : '');

        // If the field is in editing mode, render an <input> field.
        if (isEditing) {
            return (
                <div className={className}>
                    <input type={fieldType}
                           value={value !== 'undefined' ? value : ''} // Utiliser une chaîne vide si la valeur est undefined
                           onChange={onChange}
                    />
                </div>
            );
        }

        // If not in editing mode, just display the value as static text.
        return <span className={className}>{value}</span>;
    },

    /**
     * Render a date field in the format DD/MM/YYYY if isEditing is false, or in the format YYYY-MM-DD if isEditing is true.
     * This handles how the birthdate is displayed or edited.
     * @param isEditing - Whether the field is in editing mode.
     * @param value - The date value to display or edit.
     * @param onChange - The function to call when the user changes the date.
     * @returns {JSX.Element} The rendered date field.
     */
    renderDateField(isEditing, value, onChange) {
        if (isEditing) {
            // When editing, the date should be in the format 'YYYY-MM-DD' (suitable for <input type="date">).
            const formattedDate = dateUtils.formatFromJsonToSQLDate(value);
            return (
                <div className="editable-field">
                    <input type="date"
                           value={formattedDate}
                           onChange={onChange} />
                </div>
            );
        }

        // When not editing, display the date in 'DD/MM/YYYY' format.
        const displayDate = dateUtils.formatFromSQLToDisplay(value);
        return <span className="editable-field">{displayDate}</span>;
    },

    /**
     * Render a select field for gender if isEditing is true, or a static field if isEditing is false.
     * @param isEditing - Whether the field is in editing mode.
     * @param value - The current value of the gender ('M', 'F', 'O').
     * @param onChange - The function to call when the user changes the gender.
     * @returns {JSX.Element} The rendered gender field.
     */
    renderGenderField(isEditing, value, onChange) {
        if (isEditing) {
            // When editing, show a dropdown <select> for gender.
            return (
                <div className="editable-field">
                    <select value={value} onChange={onChange}>
                        <option value="M">Homme</option>
                        <option value="F">Femme</option>
                        <option value="O">Autre</option>
                    </select>
                </div>
            );
        }

        // When not editing, display the gender as text.
        const displayValue = value === 'M' ? 'Homme' : value === 'F' ? 'Femme' : 'Autre';
        return <span className="editable-field">{displayValue}</span>;
    }
};

export default HTMLRenderers;
