// TrainingInputForm.tsx
import React, { useState } from 'react';
import { TrainingInput, enviarInput } from './trainingInput';
import '@/styles/TrainingInputForm.css'; 

const TrainingInputForm: React.FC = () => {
  const [formData, setFormData] = useState<TrainingInput>({
    tipoTreino: '',
    peso: 0,
    altura: 0, // Campo de altura adicionado
    idade: 0,
    objetivo: ''
  });

  const [mensagem, setMensagem] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'peso' || name === 'idade' || name === 'altura' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensagem('');

    try {
      const resultado = await enviarInput(formData);
      setMensagem(resultado);

      // Limpar formulário se sucesso
      if (resultado.includes('sucesso')) {
        setFormData({
          tipoTreino: '',
          peso: 0,
          altura: 0, // Reset do campo altura
          idade: 0,
          objetivo: ''
        });
      }
    } catch (error) {
      setMensagem('Erro inesperado ao enviar dados.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="training-form-container">
      <h2>Registro de Treino</h2>

      <form onSubmit={handleSubmit} className="training-form">
        <div className="form-group">
          <label htmlFor="tipoTreino">Tipo de Treino *</label>
          <select
            id="tipoTreino"
            name="tipoTreino"
            value={formData.tipoTreino}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o tipo de treino</option>
            <option value="musculação">Musculação</option>
            <option value="cardio">Cardio</option>
            <option value="crossfit">Crossfit</option>
            <option value="yoga">Yoga</option>
            <option value="pilates">Pilates</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="peso">Peso (kg) *</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={formData.peso || ''}
            onChange={handleInputChange}
            min="1"
            step="0.1"
            required
            placeholder="Ex: 75.5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="altura">Altura (m) *</label>
          <input
            type="number"
            id="altura"
            name="altura"
            value={formData.altura || ''}
            onChange={handleInputChange}
            min="0.1"
            step="0.01"
            required
            placeholder="Ex: 1.75"
          />
        </div>

        <div className="form-group">
          <label htmlFor="idade">Idade *</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={formData.idade || ''}
            onChange={handleInputChange}
            min="1"
            max="120"
            required
            placeholder="Ex: 30"
          />
        </div>

        <div className="form-group">
          <label htmlFor="objetivo">Objetivo</label>
          <textarea
            id="objetivo"
            name="objetivo"
            value={formData.objetivo}
            onChange={handleInputChange}
            rows={3}
            placeholder="Ex: Ganhar massa muscular, perder peso, melhorar condicionamento..."
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="submit-button"
        >
          {enviando ? 'Enviando...' : 'Registrar Treino'}
        </button>
      </form>

      {mensagem && (
        <div className={`mensagem ${mensagem.includes('Erro') ? 'erro' : 'sucesso'}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default TrainingInputForm;