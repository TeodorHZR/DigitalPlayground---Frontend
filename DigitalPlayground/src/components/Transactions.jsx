import React, { useEffect, useState } from 'react';
import { fetchAllTransactions, fetchGameSalesStatistics, fetchSkinTransactions } from '../services/transactionService';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PodiumContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 20px;
`;

const PodiumItem = styled.div`
    background-color: ${({ place }) => (place === 1 ? 'gold' : place === 2 ? 'silver' : 'brown')};
    color: white;
    width: 150px;
    height: ${({ place }) => (place === 1 ? '200px' : place === 2 ? '150px' : '120px')};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
    border-radius: 10px;
`;

const ShowMoreButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const DownloadButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #218838;
    }
`;

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [visibleTransactions, setVisibleTransactions] = useState([]);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [skinTransactions, setSkinTransactions] = useState([]);
    const [salesStatistics, setSalesStatistics] = useState([]);
    const [topSkins, setTopSkins] = useState([]);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchAllTransactions();
                setTransactions(data || []);
                setVisibleTransactions(data.slice(0, 3)); 
            } catch (error) {
                console.error("Error loading transactions:", error);
            }
        };

        const loadSkinTransactions = async () => {
            try {
                const data = await fetchSkinTransactions();
                setSkinTransactions(data || []);
            } catch (error) {
                console.error("Error loading skin transactions:", error);
            }
        };

        const loadSalesStatistics = async () => {
            try {
                const data = await fetchGameSalesStatistics();
                setSalesStatistics(data || []);
            } catch (error) {
                console.error("Error loading sales statistics:", error);
            }
        };

        const loadTopSkins = async () => {
            try {
                const response = await fetch('https://localhost:7283/api/SkinTransaction/top3byprice');
                const data = await response.json();
                setTopSkins(data || []);
            } catch (error) {
                console.error("Error loading top skins:", error);
            }
        };

        loadTransactions();
        loadSkinTransactions();
        loadSalesStatistics();
        loadTopSkins();
    }, []);

    const handleShowMore = () => {
        setShowAllTransactions(true);
        setVisibleTransactions(transactions);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Nume", "Pret", "Data"];
        const tableRows = [];

        transactions.forEach(transaction => {
            const transactionData = [
                transaction.name,
                transaction.amount,
                new Date(transaction.date).toLocaleString()
            ];
            tableRows.push(transactionData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Tranzactii pentru jocuri", 14, 15);
        doc.save("transactions.pdf");
    };

    const chartData = {
        labels: salesStatistics.map(stat => stat.name),
        datasets: [
            {
                label: 'Numar de vanzari',
                data: salesStatistics.map(stat => stat.salesCount),
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                title: {
                    display: true,
                    text: 'Numele jocului',
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: 'white'
                },
                title: {
                    display: true,
                    text: 'Numar de vanzari',
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            },
            tooltip: {
                titleColor: 'white',
                bodyColor: 'white',
                backgroundColor: 'rgba(0,0,0,0.7)'
            }
        }
    };

    return (
        <div>
            <h1>Gestionare Tranzactii</h1>
            <h2>Statisticile vanzarilor</h2>
            <Bar data={chartData} options={chartOptions} />
            
            <h2>Top 3 Skin-uri</h2>
            <PodiumContainer>
                {topSkins.map((skin, index) => (
                    <PodiumItem key={skin.id} place={index + 1}>
                        <h3>Locul {index + 1}</h3>
                        <p>{skin.name}</p>
                        <p>{skin.price} RON</p>
                    </PodiumItem>
                ))}
            </PodiumContainer>
            
            <h2>Tranzacții pentru Skin-uri</h2>
            <ul>
                {skinTransactions.map((transaction) => (
                    <li key={transaction.id}>
                        <strong>Nume Skin:</strong> {transaction.skinName}<br />
                        <strong>Preț:</strong> {transaction.amount} $<br />
                        <strong>Data:</strong> {new Date(transaction.date).toLocaleString()}
                    </li>
                ))}
            </ul>

            <h2>Tranzacții</h2>
            <ul>
                {visibleTransactions.map((transaction) => (
                    <li key={transaction.id}>
                        <strong>Nume:</strong> {transaction.name}<br />
                        <strong>Pret:</strong> {transaction.amount} $<br />
                        <strong>Data:</strong> {new Date(transaction.date).toLocaleString()}
                    </li>
                ))}
            </ul>
            {!showAllTransactions && transactions.length > 3 && (
                <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
            )}
            <DownloadButton onClick={handleDownloadPDF}>Download PDF</DownloadButton>
        </div>
    );
};

export default Transactions;
