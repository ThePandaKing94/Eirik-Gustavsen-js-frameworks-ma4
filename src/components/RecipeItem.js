import React from "react"
import PropTypes from 'prop-types';

function RecipeItem({ thumbnail, href, title, ingredients }) {
    return (
        <div>
            <img src={thumbnail} />
            <a href={href}>{title}</a> - {ingredients}
        </div>
    )
}

RecipeItem.defaultProps = {
    title: 'No title'
};

RecipeItem.propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
    thumbnail: PropTypes.string,
    ingredients: PropTypes.string
}

export default RecipeItem;

