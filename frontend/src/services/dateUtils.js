const dateUtils = {


    /**
     * Convert a date from SQL format (YYYY-MM-DD) to display format (DD/MM/YYYY).
     * @param date
     * @returns {string}
     */
    formatFromSQLToDisplay: (date) => {
      const displayDate = new Date(date);
      return displayDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
      });
    },

    /**
     * Convert a date from display format (DD/MM/YYYY) or from YYYY-MM-DDTHH:MM:SSZ to SQL format (YYYY-MM-DD).
     * @param date
     * @returns {string}
     */
    formatFromJsonToSQLDate: (date) => {
        const dateForInput = new Date(date);
        // Récupérer les différentes parties de la date locale
        const year = dateForInput.getFullYear();
        const month = String(dateForInput.getMonth() + 1).padStart(2, '0'); // Mois commence à 0, donc ajouter 1
        const day = String(dateForInput.getDate()).padStart(2, '0'); // Jour du mois

        // Retourner une date au format YYYY-MM-DD sans UTC pour rester compatible avec l'input de type="date"
        return `${year}-${month}-${day}`;
    }
};

export default dateUtils;
