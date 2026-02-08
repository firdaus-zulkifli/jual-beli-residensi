package handler

import (
	"encoding/json"
	"net/http"
)

type Shop struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
	IsOpen      bool   `json:"is_open"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	shops := []Shop{
		{
			ID:          1,
			Name:        "Rumah Dadih",
			Description: "Fresh chilled dadih. Multiple flavors!",
			Icon:        "🍮",
			IsOpen:      true,
		},
		{
			ID:          2,
			Name:        "Ice Cream Corner",
			Description: "Homemade scoops.",
			Icon:        "🍦",
			IsOpen:      true,
		},
	}

	json.NewEncoder(w).Encode(shops)
}
