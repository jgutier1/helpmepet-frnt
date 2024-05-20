import React from 'react';
import Card from './ui/Card';
import '../index.css';

// simulamos una tabla
const cardsContent = [
    {
        title: '¿Quienes somos?',
        texto: 'HelpMePet nace para combatir los incidentes de mascotas, los hechos que pasan desapercibidos y quedan impunes...',
        subtitle: 'HelpMePet',
        src: 'https://www.iudigital.edu.co/Noticias/PublishingImages/soy_iu_digital_517.jpg'
    },
    {
        title: 'Proyecto',
        texto: 'Ayudar en comunidad a estar prevenidos por la ola de violencia y situaciones hacia mascotas...',
        subtitle: 'Unidos somos más',
        src: 'https://www.iudigital.edu.co/Noticias/PublishingImages/29062021_18.170_razones_517.jpg'
    }
]

export default function About() {

    return (
        <div className="container my-3">
            <div className="row row-cols-1 row-cols-md-3 g-4 needs-validation">
            {
                cardsContent.map(c => {
                    return (
                        <div className="col">
                        <Card 
                            title={c.title}
                            texto={c.texto}
                            subtitle={`Helpmepet`} 
                            src={c.src}
                        />
                    </div> 
                    )
                })
            }
            </div>
        </div>
    )
}
