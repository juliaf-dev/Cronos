import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faGlobe, faBook, faLandmark, faBookOpen, faUsers } from '@fortawesome/free-solid-svg-icons';

const MateriasDropdown = ({ navegarParaMateria }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const materias = [
    { nome: 'Filosofia', icone: faBook },
    { nome: 'Geografia', icone: faGlobe },
    { nome: 'História', icone: faLandmark },
    { nome: 'Literatura', icone: faBookOpen },
    { nome: 'Sociologia', icone: faUsers }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMateriaClick = (materia) => {
    navegarParaMateria({ nome: materia });
    setIsOpen(false);
  };

  return (
    <div className="materias-dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Matérias
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className="dropdown-icon" 
        />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {materias.map((materia, index) => (
            <div
              key={index}
              className="materia-item"
              onClick={() => handleMateriaClick(materia.nome)}
            >
              <FontAwesomeIcon icon={materia.icone} className="materia-icon" />
              <span>{materia.nome}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MateriasDropdown;