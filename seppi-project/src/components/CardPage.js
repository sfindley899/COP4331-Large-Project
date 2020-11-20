import React from 'react';
import PageTitle from './PageTitle';
import LoggedInName from './LoggedInName';
import CardUI from './CardUI';

const CardPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <CardUI />
        </div>
    );
}

export default CardPage;
