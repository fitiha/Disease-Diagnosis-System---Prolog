% disease_diagnosis.pl - A Prolog program for disease diagnosis

% Entry point
go :-
    write('Welcome to the Disease Diagnosis System!'), nl,
    write('Type "help." for instructions or "quit." to exit.'), nl,
    diagnose.

% Diagnose process
diagnose :-
    catch(
        (write('What is the patient''s name? '),
        read(Patient), get_single_char(_),
        hypothesis(Patient, Disease),
        write_list([Patient, ', probably has ', Disease, '.']), nl,
        undo, diagnose),
        error(_,_),
        (write('An error occurred. Please try again.'), nl, diagnose)
    ).

diagnose :-
    write('Sorry, I don''t seem to be able to diagnose the disease.'), nl,
    undo, diagnose.

% Help command
help :-
    write('Instructions:'), nl,
    write('1. Enter the patient''s name when prompted.'), nl,
    write('2. Answer the symptom questions with "y" or "n".'), nl,
    write('3. Type "quit." to exit the program.'), nl,
    diagnose.

% Quit command
quit :-
    write('Goodbye!'), nl.

% Symptoms
symptom(Patient, fever) :- verify(Patient, " have a fever (y/n) ?").
symptom(Patient, rash) :- verify(Patient, " have a rash (y/n) ?").
symptom(Patient, headache) :- verify(Patient, " have a headache (y/n) ?").
symptom(Patient, runny_nose) :- verify(Patient, " have a runny nose (y/n) ?").
symptom(Patient, conjunctivitis) :- verify(Patient, " have conjunctivitis (y/n) ?").
symptom(Patient, cough) :- verify(Patient, " have a cough (y/n) ?").
symptom(Patient, body_ache) :- verify(Patient, " have body aches (y/n) ?").
symptom(Patient, chills) :- verify(Patient, " have chills (y/n) ?").
symptom(Patient, sore_throat) :- verify(Patient, " have a sore throat (y/n) ?").
symptom(Patient, sneezing) :- verify(Patient, " have sneezing (y/n) ?").
symptom(Patient, swollen_glands) :- verify(Patient, " have swollen glands (y/n) ?").
symptom(Patient, fatigue) :- verify(Patient, " feel fatigued (y/n) ?").
symptom(Patient, nausea) :- verify(Patient, " feel nauseous (y/n) ?").
symptom(Patient, vomiting) :- verify(Patient, " have vomiting (y/n) ?").
symptom(Patient, diarrhea) :- verify(Patient, " have diarrhea (y/n) ?").

% Ask questions
ask(Patient, Question) :-
    write(Patient), write(', do you'), write(Question),
    read(N),
    ( (N == yes ; N == y)
      -> assert(yes(Question)) ;
         assert(no(Question)), fail).

:- dynamic yes/1, no/1.

% Verify symptoms
verify(P, S) :-
    (yes(S) -> true ;
     (no(S) -> fail ;
      ask(P, S))).

% Undo assertions
undo :- retract(yes(_)), fail.
undo :- retract(no(_)), fail.
undo.

% Hypotheses
hypothesis(Patient, german_measles) :-
    symptom(Patient, fever),
    symptom(Patient, headache),
    symptom(Patient, runny_nose),
    symptom(Patient, rash).

hypothesis(Patient, common_cold) :-
    symptom(Patient, headache),
    symptom(Patient, sneezing),
    symptom(Patient, sore_throat),
    symptom(Patient, runny_nose),
    symptom(Patient, chills).

hypothesis(Patient, measles) :-
    symptom(Patient, cough),
    symptom(Patient, sneezing),
    symptom(Patient, runny_nose).

hypothesis(Patient, flu) :-
    symptom(Patient, fever),
    symptom(Patient, headache),
    symptom(Patient, body_ache),
    symptom(Patient, conjunctivitis),
    symptom(Patient, chills),
    symptom(Patient, sore_throat),
    symptom(Patient, runny_nose),
    symptom(Patient, cough).

hypothesis(Patient, mumps) :-
    symptom(Patient, fever),
    symptom(Patient, swollen_glands).

hypothesis(Patient, chicken_pox) :-
    symptom(Patient, fever),
    symptom(Patient, chills),
    symptom(Patient, body_ache),
    symptom(Patient, rash).

hypothesis(Patient, food_poisoning) :-
    symptom(Patient, nausea),
    symptom(Patient, vomiting),
    symptom(Patient, diarrhea),
    symptom(Patient, fatigue).

hypothesis(Patient, malaria) :-
    symptom(Patient, fever),
    symptom(Patient, chills),
    symptom(Patient, headache),
    symptom(Patient, nausea),
    symptom(Patient, vomiting).

% Write list
write_list([]).
write_list([Term | Terms]) :-
    write(Term),
    write_list(Terms).

% Response
response(Reply) :-
    get_single_char(Code),
    put_code(Code), nl,
    char_code(Reply, Code).