package com.example.Book.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "group_booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groupId;

    private String groupName;

    @ManyToOne
    @JoinColumn(name = "group_leader_id", nullable = false)
    private Consumer groupLeader;

    private Integer noOfMembers;
    private Integer maxCapacity;
}