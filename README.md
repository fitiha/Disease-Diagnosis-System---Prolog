# Disease Diagnosis System

An intelligent agent designed using Prolog to diagnose diseases based on symptoms provided by the user. The system interacts with the user, collects symptoms, and matches them to predefined disease hypotheses.

---

## Features

- **Interactive Symptom Collection:** Engages the user with a series of questions about symptoms.
- **Multi-Disease Diagnosis:** Provides diagnoses for multiple diseases based on user responses.
- **User-Friendly Prompts:** Easy-to-follow instructions and error handling.
- **Additional Commands:** Includes commands for help and exiting the program.

---

## Supported Diseases

The system can diagnose the following diseases:

- German Measles
- Common Cold
- Measles
- Flu
- Mumps
- Chicken Pox
- Food Poisoning
- Malaria

---

## Prerequisites

- **SWI-Prolog** installed on your system.

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/disease-diagnosis-system.git
   cd disease-diagnosis-system
   ```

2. Run the Prolog program:

   ```bash
   swipl
   [disease_diagnosis].
   go.
   ```

---

## Usage

### Start the Diagnosis:

1. Run the `go.` command in the SWI-Prolog console.
2. Enter the patient's name and answer symptom questions with `y` (yes) or `n` (no).

### Help Command:

- Type `help.` to get instructions on how to use the program.

### Quit Command:

- Type `quit.` to exit the program.

---

## Example

```prolog
Welcome to the Disease Diagnosis System!
Type "help." for instructions or "quit." to exit.

What is the patient's name? John.
John, do you have a fever (y/n)? y.
John, do you have a headache (y/n)? y.
John, do you have a runny nose (y/n)? y.
John, do you have a rash (y/n)? n.
John, do you have conjunctivitis (y/n)? n.
John, do you have a cough (y/n)? y.
John, do you have body aches (y/n)? y.
John, do you have chills (y/n)? y.
John, do you have a sore throat (y/n)? y.
John, do you have sneezing (y/n)? n.
John, do you have swollen glands (y/n)? n.
John, do you feel fatigued (y/n)? y.
John, do you feel nauseous (y/n)? n.
John, do you have vomiting (y/n)? n.
John, do you have diarrhea (y/n)? n.

John, probably has flu.
```

---

## Contributing

Contributions are welcome! If you would like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the MIT License. 