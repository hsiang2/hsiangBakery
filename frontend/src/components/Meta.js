import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}
    
Meta.defaultProps = {
    title: 'Hsiang Bakery',
    description: 'We sell fresh bread',
    keywords: 'bread, bakery'
}

export default Meta