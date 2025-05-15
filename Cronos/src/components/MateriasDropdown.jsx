import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faGlobe, faBook, faLandmark, faBookOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../styles/dropdown.css';

const MateriasDropdown = ({ navegarParaMateria }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const toggleRef = useRef();
  
  const materias = [
    { nome: 'Filosofia', icone: faBook },
    { nome: 'Geografia', icone: faGlobe },
    { nome: 'História', icone: faLandmark },
    { nome: 'Sociologia', icone: faUsers }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMateriaClick = (materia) => {
    navegarParaMateria({ nome: materia });
    setIsOpen(false);
  };

  // Fecha o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          dropdownRef.current && 
          !dropdownRef.current.contains(event.target) &&
          toggleRef.current &&
          !toggleRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="materias-dropdown" ref={dropdownRef}>
      <button 
        className="dropdown-toggle" 
        onClick={toggleDropdown}
        ref={toggleRef}
      >
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